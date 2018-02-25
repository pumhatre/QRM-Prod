using QRMService.DataBase;
using QRMService.Models;
using System;
using System.Collections.Generic;
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

                //if (projectId > 0)
               // {
                    //var entities = (from users in db.UserDetails
                    //                join role in db.UserProjectRoleAssociations on users.UserId equals role.UserId
                    //                select new
                    //                {
                    //                    users,
                    //                    role,
                    //                    proejectId = role.ProjectId

                    //                }).Where(x => x.proejectId == projectId).ToList();
                  
                    //List<UserModel> userEntity = new List<UserModel>();
                    //if (entities != null && entities.Any())
                    //{
                    //    foreach (var row in entities)
                    //    {
                    //        UserModel model = new UserModel();
                    //        model.userId = row.users.UserId;
                    //        model.firstName = row.users.FirstName;
                    //        model.lastName = row.users.LastName;
                    //        model.middleName = row.users.MiddleName;
                    //        model.email = row.users.Email;
                    //        model.phone = row.users.Phone;
                    //        model.roleId = row.role.RoleId;
                    //        model.userProjectRoleId = row.role.UserProjectRoleId;
                    //        userEntity.Add(model);
                    //    }
                    //}
                   
                    

                    var userList = (from pd in db.UserDetails
                                    join od in db.UserProjectRoleAssociations on pd.UserId equals od.UserId
                                    join p in db.ProjectMasters on od.ProjectId equals p.ProjectID
                                 //   where od.ProjectId == projectId
                                    join rd in db.RoleMasters on od.RoleId equals rd.RoleId
                                    select new UserModel
                                    {
                                        userId = pd.UserId,
                                        firstName = pd.FirstName,
                                        middleName = pd.MiddleName,
                                        lastName = pd.LastName,
                                        email = pd.Email,
                                        phone = pd.Phone,
                                        roleId = od.RoleId,
                                        roleName = rd.RoleName,
                                        projectName=p.ProjectName,
                                        projectId=p.ProjectID,
                                        userProjectRoleId = od.UserProjectRoleId
                                    }).OrderByDescending(p => p.userId).ToList();
                    projectUserModel.userDetails = userList;
               // }
                
                return projectUserModel;
            }
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
                        if(user.userId == 0)
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
                            userrole.ProjectId = user.projectId;
                            userrole.RoleId = user.roleId;
                            userrole.UserProjectRoleId = userroleId +1 ;
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
                            roleAssociation.RoleId = user.roleId;
                            roleAssociation.ProjectId = user.projectId;
                            context.Entry(roleAssociation).State = System.Data.Entity.EntityState.Modified;
                            context.SaveChanges();

                            transaction.Commit();

                            response.IsSuccess = true;

                            response.ResponseMessage = "User Updated Successfully";

                        }
                    }catch(Exception ex)
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
                    catch(Exception ex)
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
                                    role.RoleId = user.roleId;
                                }
                                else
                                {

                                    UserProjectRoleAssociation userRoleAssoc = new UserProjectRoleAssociation();
                                    userRoleAssoc.UserId = user.userId;
                                    userRoleAssoc.UserProjectRoleId = roleCounter--;
                                    userRoleAssoc.ProjectId = projectId;
                                    userRoleAssoc.RoleId = user.roleId;
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