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
                        roleId =Convert.ToString(row.Field<int>(Constants.ProjectColumnName.roleId.ToString())),
                        roleName = row.Field<string>(Constants.ProjectColumnName.roleName.ToString()),
                        projectName =row.Field<string>(Constants.ProjectColumnName.projectName.ToString()),
                        projectId = Convert.ToString(row.Field<int>(Constants.ProjectColumnName.projectId.ToString())),
                        userProjectRoleId = row.Field<int>(Constants.ProjectColumnName.userProjectRoleId.ToString()),
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
                            instance.UserId = userId + 1;
                            instance.FirstName = user.firstName;
                            instance.MiddleName = user.middleName;
                            instance.LastName = user.lastName;
                            instance.Phone = user.phone;
                            instance.Email = user.email;
                            context.UserDetails.Add(instance);

                            var userrole = new UserProjectRoleAssociation();
                            var userroleId = context.UserProjectRoleAssociations.OrderByDescending(p => p.UserProjectRoleId).FirstOrDefault().UserProjectRoleId;
                            userrole.UserId = userId + 1;
                            if (user.projectId != null && Convert.ToInt32(user.projectId) !=0)
                            {
                                userrole.ProjectId = Convert.ToInt32(user.projectId);
                            }
                            else
                            {
                                userrole.ProjectId = null;
                            }

                            userrole.RoleId =Convert.ToInt32(user.roleId);
                            userrole.UserProjectRoleId = userroleId + 1;
                            context.UserProjectRoleAssociations.Add(userrole);
                            context.SaveChanges();
                            transaction.Commit();
                            response.IsSuccess = true;
                            response.ResponseMessage = "User Added Successfully";

                        }
                        else
                        {
                            UserDetail userDetail = context.UserDetails.Find(user.userId);

                            userDetail.FirstName = user.firstName;
                            userDetail.LastName = user.lastName;
                            userDetail.MiddleName = user.middleName;
                            userDetail.Phone = user.phone;
                            userDetail.Email = user.email;
                            context.Entry(userDetail).State = System.Data.Entity.EntityState.Modified;
                            context.SaveChanges();

                            var userRoleId = context.UserProjectRoleAssociations.FirstOrDefault(p => p.UserId == user.userId).UserProjectRoleId;
                            UserProjectRoleAssociation roleAssociation = context.UserProjectRoleAssociations.Find(userRoleId);
                            roleAssociation.RoleId = Convert.ToInt32(user.roleId);
                            roleAssociation.ProjectId = Convert.ToInt32(user.projectId);
                            context.Entry(roleAssociation).State = System.Data.Entity.EntityState.Modified;
                            context.SaveChanges();

                            transaction.Commit();

                            response.IsSuccess = true;

                            response.ResponseMessage = "User Updated Successfully";

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
                        var userDetail = context.UserDetails.Find(UserId);
                        context.UserDetails.Remove(userDetail);

                        var userRoleId = context.UserProjectRoleAssociations.FirstOrDefault(p => p.UserId == UserId).UserProjectRoleId;
                        var userRoleObj = context.UserProjectRoleAssociations.Find(userRoleId);

                        context.UserProjectRoleAssociations.Remove(userRoleObj);

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
                            var role = context.UserProjectRoleAssociations.Where(s => s.UserId == user.userId && s.UserProjectRoleId == user.userProjectRoleId).FirstOrDefault();
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
                                }

                                if (role != null)
                                {
                                    role.RoleId = Convert.ToInt32(user.roleId);
                                }
                                else
                                {

                                    UserProjectRoleAssociation userRoleAssoc = new UserProjectRoleAssociation();
                                    userRoleAssoc.UserId = user.userId;
                                    userRoleAssoc.UserProjectRoleId = roleCounter--;
                                    userRoleAssoc.ProjectId = projectId;
                                    userRoleAssoc.RoleId = Convert.ToInt32(user.roleId);
                                }
                            }
                        }
                        if (deletedUserIds.Count > 0)
                        {
                            foreach (var userId in deletedUserIds)
                            {
                                context.UserProjectRoleAssociations.Remove(context.UserProjectRoleAssociations.Where(s => s.UserId == userId).FirstOrDefault());
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