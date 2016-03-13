using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TheFlavour.Startup))]
namespace TheFlavour
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
