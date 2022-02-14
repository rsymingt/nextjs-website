declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        SMTP_USER: string,
        SMTP_PASSWORD: string,
        SMTP_CONTACT_EMAIL: string,
      }
    }
}
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}