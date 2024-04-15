Trying to set up a project pattern to code with Typescript.

Pattern used is MVC based on Laravel using OOP. Inside the src folder I have two other folders the controllers and models, as the router file I'm using the app.ts It imports the dependencies, calls the controllers and sets up all routes.
If you want to use "paths" in tsconfig.json It's needed to install module-alias and require("module-alias/register") in EVERY file that uses your path and also set a:

  package.json:
  "_moduleAliases":{
    "your_ts_alias": "your_output_folder"
  }
