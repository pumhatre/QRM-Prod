using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ProjectUserAssociationModel
    {
        /// <summary>
        /// Gets or sets the project user identifier.
        /// </summary>
        /// <value>
        /// The project user identifier.
        /// </value>
        [Required]
        public int ProjectUserId { get; set; }

        /// <summary>
        /// Gets or sets the project identifier.
        /// </summary>
        /// <value>
        /// The project identifier.
        /// </value>
        [Required]
        public int ProjectID { get; set; }

        /// <summary>
        /// Gets or sets the name of the project.
        /// </summary>
        /// <value>
        /// The name of the project.
        /// </value>
        public string ProjectName { get; set; }

        /// <summary>
        /// Gets or sets the name of the user.
        /// </summary>
        /// <value>
        /// The name of the release.
        /// </value>
        public string ProjectUserName { get; set; }
    }
}