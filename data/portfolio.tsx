import React from 'react';

import styles from '../src/styles/Portfolio.module.css';

// TODO: #4 add portfolio projects @rsymingt

const portfolioData = {
  projects: [
    {
      title: 'Weather App',
      type: 'Android App',
      banner: require('../public/portfolio/weather-app/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              In order to get some experience using the Android SDK. I Set out
              to follow a tutorial to create a very basic weather app that
              integrates with the weather open api.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10"></p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/Weather_App',
      additional: {
        Language: 'Java | AndroidSDK',
        Stage: 'Complete',
      },
    },
    {
      title: 'Industry Code Classifier',
      type: 'AI',
      banner: require('../public/portfolio/industry-code-classifier/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              For our artificial intelligence final project. We set out to build
              an industry code classifier. This would take a company description
              as input and try to output an industry code that directly mapped
              to the company.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              Utilizing Supper Vector Machines, we set out to iteratively test
              and train our model, modifying parameters until it was the best
              the tool could offer. We ended up with a 89% accuracy.
            </p>
          </div>
        );
      },
      githubURL: '/industry-code-classifier-master.zip',
      additional: {
        Language: 'Python | sklearn',
        Stage: 'Complete',
      },
    },
    {
      title: 'Project Organization',
      type: 'Command Line Tool',
      banner: require('../public/portfolio/projecto/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              I needed a way to search through all my course notes for keywords
              such as <q>AVL Tree</q> to find all occurence of the full word and
              individual words for studying.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              I developed a command line tool to utilize AVL trees to search
              through text files for keywords efficiently.
            </p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/nextjs-website',
      additional: {
        Language: 'C++ | AVL Tree',
        Stage: 'Complete',
      },
    },
    {
      title: 'Telegram Chat Streamer',
      type: 'Script',
      banner: require('../public/portfolio/telegram-app/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              Built a script to stream telegram chat data to a file for later
              viewing.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10"></p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/telegram-app-pub',
      additional: {
        Language: 'Python',
        Stage: 'Complete',
      },
    },
    {
      title: 'Dropbox Folder Sync',
      type: 'Script',
      banner: require('../public/portfolio/dropbox-sync/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              Built a script to sync a folder to any folder on dropbox.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10"></p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/python-dropbox-sync-pub',
      additional: {
        Language: 'Python',
        Stage: 'Complete',
      },
    },
    {
      title: 'Signal Analyzer',
      type: 'Library',
      banner: require('../public/portfolio/signal-analyzer/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              Utilizing various libraries to extract Fourier Transforms and
              Short Time Fourier Transforms and convert them to beat maps out of
              audio files, as an experiment to be used in a tap tap revolution
              style game. This game would allow a user to upload any sound file
              and have a beat map generated at a precise difficulty.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10"></p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/SignalAnalyzer',
      additional: {
        Language: 'Java | STFT | FT',
        Stage: 'Complete',
      },
    },
    {
      title: 'Space Simulator',
      type: 'Game',
      banner: require('../public/portfolio/space-simulator/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              For my final project for physics class in high-school. I decided
              to program our solar systems with planets in perfect elyptical
              orbits.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              I programmed real-world physics into the simulation. You could
              follow a planet as it travels around the sun or a moon as it
              travels around a planet. The user also had the ability to add in
              objects of a chosen mass and velocity utilizing the mouse pointer.
              The system would then pause the game and simulate the trajectory
              of the mass at the given velocity. This allowed you to get an idea
              of how to get the object into the orbit the user wanted.
            </p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/space_simulator',
      additional: {
        Language: 'Java | Processing',
        Stage: 'Complete',
      },
    },
    {
      title: 'First Robotics Competition',
      type: 'Robotics',
      banner: require('../public/portfolio/frc/arena.jpg'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl leading-10">
              First Robotics Canada is a national robotics competition where
              high schools across the country can compete to build and program a
              robot to do a specific set of tasks.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              I worked on programming the robot drivetrain and autonomous
              functions. Using a PID motor-encoder controller I was able to map
              analog signal to wheel and elevator speed. This allowed all the
              motors to reliably turn at the same speed. With this, we were also
              able to sequence lists of instructions for the robot to execute
              based on a distance in meters. During the competition, this gave
              us extremely accurate autonomy and control.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              Overall, I enjoyed working with the Spartan Droid team and having
              the opportunity learn new skills and compete in the competition.
            </p>
          </div>
        );
      },
      githubURL:
        'https://github.com/rsymingt/robot/tree/master/src/org/usfirst/frc/team5631/robot',
      additional: {
        Language: 'Java',
        Stage: 'Complete',
      },
    },
    {
      title: 'Rotary Local Lager (CMS)',
      type: 'Web Development',
      banner: require('../public/portfolio/rll/rll.jpg'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl leading-10">
              The non-profit, Rotary Club of Guelph, was looking to market and
              promote a new initiative to raise funds for water treatment
              installation programs around the world.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              As one of my first web development projects, I worked with a
              Rotary Club member to design and create a Content Management
              System that allowed admin users to add, modify, or delete
              information on each page. Utilizing MySQL I stored salted
              passwords and page content. Once the page is loaded, the content
              is extracted from the database and HTML is then generated for the
              user based on that content.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              As a Novice, I spent countless hours creating my own custom CMS
              components, authentication, and dynamic content generation.
              Knowing what I know now I would&apos;ve opted for a more modern
              language and utilized pre-existing libraries. However, this was an
              amazing learning experience and fun project to work with the
              Rotary Club on.
            </p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/rotary-local-lager-cms',
      additional: {
        Language: 'PHP | Bootstrap',
        Stage: 'Complete',
      },
    },
    {
      title: 'React Web Workers (Fractals)',
      type: 'Web Development',
      banner: require('../public/portfolio/web-worker/fractal-snap.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl leading-10">
              I was looking to create a unique website that would help me
              standout from other web development websites.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              Utilizing web workers, I was able to calculate randomly generated
              fractals with varying constraints on branch depth, count, and
              length. Web workers create a non-blocking background process to do
              CPU heavy tasks without disrupting the user experience on the
              website. The process was able to run the calculations and send
              messages to the main process with a generated canvas to display on
              the webpage.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              Overall, tinkering with web workers was a great learning
              experience and could be useful for creating non-blocking web
              applications. This project is incomplete and I am still working on
              it.
            </p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/react-website-web-workers',
      additional: {
        Language: 'React.js | Bootstrap',
        Stage: 'Incomplete',
      },
    },
    {
      title: 'Cloud Application (PWA)',
      type: 'Full-Stack Application',
      banner: require('../public/portfolio/cloud-ui/cloud-ui-1.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              Living in rural areas comes with the drawback of poor internet
              quality. I needed to be able to download large collections of
              files and photos from the cloud without affecting the internet
              while it was being used.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              To accomplish this I created 3 microservices:
            </p>
            <ul className={styles.list}>
              <li>Cloud-API</li>
              <li>Cloud-Retriever</li>
              <li>Cloud-UI</li>
            </ul>
            <br />
            <h4 className={styles['heading-4']}>Cloud-API</h4>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              Manages CRUD operations to schedules table and local folder
              listings.
            </p>
            <br />
            <h4 className={styles['heading-4']}>Cloud-Retriever</h4>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              Listens to SQL table updates for file/folder cronjobs and only
              downloads files within the cronjobs time range. Utilizes streams
              to download files chunk-by-chunk with a custom CloudManager
              service and updates database with progress.
            </p>
            <br />
            <h4 className={styles['heading-4']}>Cloud-UI</h4>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              Designed to interact with the cloud-api to add, update and delete
              scheduled downloads.
            </p>
            <br />
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              By deploying these on a docker swarm behind a traefik
              reverse-proxy with google oauth2, I have security, scaleability
              and access to my scheduler remotely.
            </p>
          </div>
        );
      },
      githubURL: '',
      additional: {
        Language: 'React.js | Bootstrap | NodeJS (Express)',
        Stage: 'Complete',
      },
    },
    {
      title: 'Python Scraper',
      type: 'Script',
      banner: require('../public/portfolio/py-scraper/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              Supply chain issues have made it difficult to find products in
              stock. To solve this issue I&apos;ve created a configurable web
              scraper with the ability to recursively search.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              The scraper will iterate through a list of JSON configurations.
              Each configuration is capable of getting a list of elements
              matching a css selector and filtering it based on regex tests.
              nested scraping configurations can be added to repeat the scrape
              on the page if the matched list contains links.
            </p>
            <br />
            <h4 className={styles['heading-4']}>Example Configuration</h4>
            <br />
            <div>
              <pre className={styles['code-block']}>
                <code>
                  {JSON.stringify(
                    {
                      title: 'Canada Computers DDR5',
                      url: 'https://www.canadacomputers.com/search/results_details.php?language=en&keywords=ddr5',
                      loadmore: true,
                      pageSelector: '#load_more',
                      rootSelector: '.productTemplate',
                      urlSelector: 'link',
                      selectors: {
                        title: '.productTemplate_title',
                        link: '.productTemplate_title > a',
                        price: '.pq-hdr-product_price',
                        extra: '.addCartSearch',
                      },
                      filterDict: {
                        title: [
                          ['\\d+MHz', true],
                          ['32GB', true],
                          ['\\+', false],
                        ],
                      },
                      notifyFilter: ['price', 'title'],
                      maxPages: 'inf',
                      _scrape: {
                        url: 'link',
                        rootSelector: '.page-product_info.container',
                        selectors: {
                          availability: '.pi-prod-availability',
                          onlineStock:
                            '.pi-prod-availability > span:first-of-type > i.fa-check',
                          storeStock:
                            '.pi-prod-availability > span:nth-of-type(2) > i.fa-check',
                        },
                        filterDict: {},
                      },
                    },
                    null,
                    4
                  )}
                </code>
              </pre>
            </div>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/py-scraper',
      additional: {
        Language: 'Python | Selenium',
        Stage: 'Complete',
      },
    },
    {
      title: 'NextJS Website',
      type: 'Web Development',
      banner: require('../public/portfolio/nextjs-website/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              I developed a Next.js application using React and TailwindCSS to
              create custom layouts and animations.
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10"></p>
          </div>
        );
      },
      githubURL: 'https://github.com/rsymingt/nextjs-website',
      additional: {
        Language: 'React.js | TailwindCSS | Next.js',
        'Project Type': 'Web Application',
        Stage: 'Incomplete',
      },
    },
    {
      title: 'Microservices Framework',
      type: 'Framework',
      banner: require('../public/portfolio/microservices-framework/screen.png'),
      description() {
        return (
          <div className="inline-flex flex-col gap-10">
            <p className="font-normal text-2xl">
              There doesn&apos;t seem to be an easy way to frame distributed
              systems in a single repo and dynamically switch the type of system
              being used (Thread, Container, AWS).
            </p>
            <br />
            <p className="font-normal text-lg text-neutral-600 leading-10">
              I am working on developing a framework to make it easier to keep
              services in one project related to some sort of gateway and deploy
              them to a specified production environment, while still being able
              to test locally.
            </p>
          </div>
        );
      },
      githubURL: '',
      additional: {
        Language: 'NodeJS',
        Stage: 'Incomplete',
      },
    },
  ],
};

export default portfolioData;
