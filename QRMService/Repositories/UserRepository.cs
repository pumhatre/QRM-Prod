using QRMFrameworkHelpers;
using QRMService.Common;
using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace QRMService.Repositories
{
    public class UserRepository
    {
        public ProjectUserModel GetUsers()
        {
            ProjectUserModel projectUserModel = new ProjectUserModel();

            using (var db = new QRMEntities())
            {
                projectUserModel.proejectList = db.ProjectMasters.Select(x => x.ProjectID).ToList();
                projectUserModel.userDetails = GetProjectData();
                return projectUserModel;
            }
        }

        private static List<UserModel> GetProjectData()
        {
            var helper = new SqlClientHelper();
            DataTable dtUserModel = helper.GetDataTableByProcedure(Constants.UspGetProjectData, "default", true);
            List<UserModel> userModelList = new List<UserModel>();
            if (dtUserModel != null && dtUserModel.Rows.Count > 0)
            {
                dtUserModel.AsEnumerable().ToList().ForEach(row =>
                {
                    userModelList.Add(new UserModel
                    {
                        userId = row.Field<int>(Constants.ProjectColumnName.userId.ToString()),
                        firstName = row.Field<string>(Constants.ProjectColumnName.firstName.ToString()),
                        middleName = row.Field<string>(Constants.ProjectColumnName.middleName.ToString()),
                        lastName = row.Field<string>(Constants.ProjectColumnName.lastName.ToString()),
                        email = row.Field<string>(Constants.ProjectColumnName.email.ToString()),
                        phone = row.Field<string>(Constants.ProjectColumnName.phone.ToString()),
                       // roleId =Convert.ToString(row.Field<int?>(Constants.ProjectColumnName.roleId.ToString())),
                        roleName = row.Field<string>(Constants.ProjectColumnName.roleName.ToString())
                       // projectName =row.Field<string>(Constants.ProjectColumnName.projectName.ToString()),
                       // projectId = row.Field<int?>(Constants.ProjectColumnName.projectId.ToString()).ToString(),
                      //  userProjectRoleId = row.Field<int>(Constants.ProjectColumnName.userProjectRoleId.ToString()),
                    });
                });
            }
            return userModelList;
        }

        public UserConfigurationResponseModel InsertUpdateUsers(UserModel user)
        {
            var response = new UserConfigurationResponseModel();

            using (QRMEntities context = new QRMEntities())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        if (user.userId == 0)
                        {
                            var instance = new UserDetail();
                            var userId = context.UserDetails.OrderByDescending(p => p.UserId).FirstOrDefault().UserId;
                            //get emaildids of existing users
                            List<string> emailIds = context.UserDetails.Select(x => x.Email).ToList();

                            if (emailIds.Any(x => x == user.email))
                            {

                                transaction.Commit();
                                response.IsSuccess = false;
                                response.ResponseMessage = "Email Id already exists";
                            }
                            else
                            {
                                instance.UserId = userId + 1;
                                instance.FirstName = user.firstName;
                                instance.MiddleName = user.middleName;
                                instance.LastName = user.lastName;
                                instance.Phone = user.phone;
                                instance.Email = user.email;
                                instance.RoleId = user.roleId != null ? Convert.ToInt32(user.roleId) : 0;
                                context.UserDetails.Add(instance);
                                context.SaveChanges();


                                transaction.Commit();
                                response.IsSuccess = true;
                                response.ResponseMessage = "User Added Successfully";
                            }

                        }
                        else
                        {
                            UserDetail userDetail = context.UserDetails.Find(user.userId);

                            //get emaildids of existing users
                            List<string> emailIds = context.UserDetails.Where(x => x.UserId != user.userId).Select(x => x.Email).ToList();

                            if (emailIds.Any(x => x == user.email))
                            {

                                transaction.Commit();
                                response.IsSuccess = false;
                                response.ResponseMessage = "Email Id already exists";
                            }
                            else
                            {
                                userDetail.FirstName = user.firstName;
                                userDetail.LastName = user.lastName;
                                userDetail.MiddleName = user.middleName;
                                userDetail.Phone = user.phone;
                                userDetail.Email = user.email;
                                userDetail.RoleId = user.roleId != null ? Convert.ToInt32(user.roleId) : 0; 
                                context.Entry(userDetail).State = System.Data.Entity.EntityState.Modified;
                                context.SaveChanges();
                                transaction.Commit();

                                response.IsSuccess = true;
                                response.ResponseMessage = "User Updated Successfully";
                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        response.IsSuccess = false;

                        response.ResponseMessage = "Failed to update User";
                        transaction.Rollback();
                    }
                    return response;
                }
            }
        }


        public UserConfigurationResponseModel DeleteUser(int UserId)
        {
            var response = new UserConfigurationResponseModel();

            using (QRMEntities context = new QRMEntities())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {

                        var userRoleObj = context.UserProjectAssociations.Where(p => p.UserId == UserId);
                        context.UserProjectAssociations.RemoveRange(userRoleObj);                       
                        var userDetail = context.UserDetails.Find(UserId);
                        context.UserDetails.Remove(userDetail);
                        context.SaveChanges();
                        transaction.Commit();

                        response.IsSuccess = true;
                        response.ResponseMessage = "User Deleted Succesfully";


                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        response.IsSuccess = false;
                        response.ResponseMessage = "User Deleted Succesfully";

                    }
                }
            }
            return response;
        }



        public bool updateDeleteUsers(List<UserModel> users, int projectId, List<int> deletedUserIds)
        {
            using (QRMEntities context = new QRMEntities())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        var roleCounter = -1;
                        foreach (var user in users)
                        {
                           // var role = context.UserProjectAssociations.Where(s => s.UserId == user.userId && s.UserProjectRoleId == user.userProjectRoleId).FirstOrDefault();
                            var userData = context.UserDetails.Where(s => s.UserId == user.userId).FirstOrDefault();
                            if (!deletedUserIds.Contains(user.userId))
                            {

                                if (userData != null)
                                {
                                    userData.FirstName = user.firstName;
                                    userData.LastName = user.lastName;
                                    userData.MiddleName = user.middleName;
                                    userData.Phone = user.phone;
                                    userData.Email = user.email;
                                    int userRole;
                                    userData.RoleId = int.TryParse(user.roleId, out userRole) == false ? 0 : userRole;
                                       
                                }

                                //if (role != null)
                                //{
                                //    role.RoleId = Convert.ToInt32(user.roleId);
                                //}
                                //else
                                //{

                                    //UserProjectAssociation userRoleAssoc = new UserProjectAssociation();
                                    //userRoleAssoc.UserId = user.userId;
                                    //userRoleAssoc.UserProjectRoleId = roleCounter--;
                                    //userRoleAssoc.ProjectId = projectId;
                                    //userRoleAssoc.RoleId = Convert.ToInt32(user.roleId);
                                //}
                            }
                        }
                        if (deletedUserIds.Count > 0)
                        {
                            foreach (var userId in deletedUserIds)
                            {
                                context.UserProjectAssociations.Remove(context.UserProjectAssociations.Where(s => s.UserId == userId).FirstOrDefault());
                                context.UserDetails.Remove(context.UserDetails.Where(s => s.UserId == userId).FirstOrDefault());
                            }
                        }
                        context.SaveChanges();

                        transaction.Commit();

                    }
                    catch (System.Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
            }
            return true;
        }
    }
}