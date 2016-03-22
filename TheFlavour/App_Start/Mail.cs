using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;
using RestSharp.Authenticators;

namespace TheFlavour.App_Start
{
    public class Mail
    {
        // Setup MailGun for sending messages.
        // To use this function, you have to
        // include `TheFlavour.App_Start` namespace.
        public static Tuple<RestClient, RestRequest> MailAuth()
        {
            RestClient client = new RestClient();
            client.BaseUrl = new Uri("https://api.mailgun.net/v3");
            client.Authenticator = new HttpBasicAuthenticator("api",
                "key-df53234228b396feac9da6e2cc066c01");
            RestRequest request = new RestRequest();
            request.AddParameter("domain",
                "sandbox24405ccf53df416781e7bcf22d0261aa.mailgun.org", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";

            return new Tuple<RestClient, RestRequest>(client, request);
        }
    }
}