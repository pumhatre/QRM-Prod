using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QRMService.Models
{
    public class ReferenceTableResponseModel
    {
        /// <summary>
        /// Gets or sets the name of the table.
        /// </summary>
        /// <value>
        /// The name of the table.
        /// </value>
        public string ReferenceTableName { get; set; }

        /// <summary>
        /// Gets or sets the code.
        /// </summary>
        /// <value>
        /// The code.
        /// </value>
        public string ReferenceCode { get; set; }

        /// <summary>
        /// Gets or sets the reference value.
        /// </summary>
        /// <value>
        /// The reference value.
        /// </value>
        public string ReferenceValue { get; set; }
    }
}