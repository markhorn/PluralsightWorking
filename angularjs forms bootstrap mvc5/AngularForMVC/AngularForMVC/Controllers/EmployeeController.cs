using AngularForMVC.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace AngularForMVC.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult GetEmployees()
        {
            List<EmployeeVM> list = new List<EmployeeVM>()
            {
                new EmployeeVM() {
                    FullName = "Milton Waddams"
                },
                new EmployeeVM() {
                    FullName = "Andy Bernard"
                }
            };

            return GetJsonContentResult(list);
            // return new HttpStatusCodeResult(404, "custom error message...");
        }

        public ActionResult Create(EmployeeVM employee)
        {
            if (ModelState.IsValid)
            {
                var id = new { id = 12345 }; //would come from database
                return GetJsonContentResult(id);

            }

            List<string> errors = new List<string>();
            errors.Add("Insert Failed.");
            if (!ModelState.IsValidField("Notes"))
                errors.Add("Notes must be at least 5 characters long.");

            var s = String.Join("\n", errors);

            return new HttpStatusCodeResult(HttpStatusCode.InternalServerError,
                String.Join("  ", errors));
        }

        public ActionResult Update(EmployeeVM employee)
        {
            if (ModelState.IsValid)
            {
                return new HttpStatusCodeResult(HttpStatusCode.OK, "Update success");

            }

            List<string> errors = new List<string>();
            errors.Add("Update Failed.");
            if (!ModelState.IsValidField("Notes"))
                errors.Add("Notes must be at least 5 characters long.");

            var s = String.Join("\n", errors);

            return new HttpStatusCodeResult(HttpStatusCode.InternalServerError,
                String.Join("  ", errors));
        }

        public ContentResult GetJsonContentResult(object data)
        {
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var jsonResult = new ContentResult
            {
                Content = JsonConvert.SerializeObject(data, camelCaseFormatter),
                ContentType = "application/json"
            };
            return jsonResult;
        }
    }
}