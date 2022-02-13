
export default {
    "projects": [
        // {
        //     "title": "First Robotics Competition",
        //     "banner": require("../public/portfolio/frc/group-photo.jpg"),
        //     "description": "First Robotics Competition",
        // },
        {
            "title": "Rotary Local Lager (CMS)",
            "banner": require("../public/portfolio/rll/rll.jpg"),
            description() {
                return(
                    <div>
                        <p className="font-medium">
                            The non-profit, Rotary Club of Guelph, was looking to market and promote a new initiative to raise funds for water treatment installation programs around the world. 
                            I worked with a Rotary Club member to design and create a Content Management System that allowed any admin users to add, modify, or delete information on each page.
                        </p>
                    </div>
                )
            }
        },
        {
            "title": "Cloud UI (PWA)",
            "banner": require("../public/portfolio/cloud-ui/cloud-ui-1.png"),
            description() {
                return(
                    <div>
                        <p>The non-profit, Rotary Club of Guelph, was looking to market and promote a new initiative to raise funds for water treatment installation programs around the world</p>
                        <p>I worked with a Rotary Club member to design and create a Content Management System that allowed any admin users to add, modify, or delete information on each page</p>
                    </div>
                )
            }
        },
        {
            "title": "React Web Workers (Fractals)",
            "banner": require("../public/portfolio/web-worker/fractal-snap.png"),
            description() {
                return(
                    <div>
                        <p>The non-profit, Rotary Club of Guelph, was looking to market and promote a new initiative to raise funds for water treatment installation programs around the world</p>
                        <p>I worked with a Rotary Club member to design and create a Content Management System that allowed any admin users to add, modify, or delete information on each page</p>
                    </div>
                )
            }
        }
    ]
}