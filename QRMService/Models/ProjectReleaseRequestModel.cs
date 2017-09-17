using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ProjectReleaseRequestModel
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
        public int ProjectId { get; set; }

        /// <summary>
        /// Gets or sets the name of the release.
        /// </summary>
        /// <value>
        /// The name of the release.
        /// </value>
        public string ReleaseName { get; set; }
    }
}