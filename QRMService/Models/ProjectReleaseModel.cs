using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ProjectReleaseModel
    {
        /// <summary>
        /// Gets or sets the project release identifier.
        /// </summary>
        /// <value>
        /// The project release identifier.
        /// </value>
        public int ProjectReleaseId { get; set; }

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
        /// Gets or sets the name of the release.
        /// </summary>
        /// <value>
        /// The name of the release.
        /// </value>
        [Required]
        public string ReleaseName { get; set; }
    }
}