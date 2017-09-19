using QRMService.DataBase;
using QRMService.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace QRMService.Repositories
{
    public class UserRepository
    {
        public ProjectUserModel GetUsers(int projectId)
        {
            using (var db = new QRMEntities())
            {
                var entities = (from users in db.UserDetails
                                join role in db.UserProjectRoleAssociations on users.UserId equals role.UserId
                                select new
                                {
                                    users,
                                    role,
                                    proejectId = role.ProjectId

                                }).Where(x => x.proejectId == projectId).ToList();
                ProjectUserModel projectUserModel = new ProjectUserModel();
                List<UserModel> userEntity = new List<UserModel>();
                if (entities != null && entities.Any())
                {


                    foreach (var row in entities)
                    {
                        UserModel model = new UserModel();
                        model.userId = row.users.UserId;
                        model.firstName = row.users.FirstName;
                        model.lastName = row.users.LastName;
                        model.middleName = row.users.MiddleName;
                        model.email = row.users.Email;
                        model.phone = row.users.Phone;
                        model.roleId = row.role.RoleId;
                        model.userProjectRoleId = row.role.UserProjectRoleId;
                        userEntity.Add(model);
                    }
                }
                projectUserModel.proejectList= db.ProjectMasters.Select(x => x.ProjectID).ToList();
                projectUserModel.userDetails = userEntity;
                return projectUserModel;
            }
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
                        if (deletedUserIds != null)
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