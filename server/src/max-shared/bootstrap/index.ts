import { mkdirSync, existsSync, writeFileSync } from "fs";

/**
 * USAGE:
 * In unboxd-web-api/api/index.ts, include bootstrapProject(process.argv.slice(2)) in the dbManager.live callback BOOTSRAP SECTION.
 * 
 * Then run yarn start {project name} where "project name" is the name of your new project.
 * 
 */

type Project = Array<Folder | File>;
type Folder = {
  folder: {
    name: string,
    children?: Project
  }
};

type File = {
  file: {
    name: string,
  }
}

const baseFolderStructure: Project = [
  {
    folder: {
      name: "api",
      children: [
        {
          folder: {
            name: "controllers",
            children: [
              {
                file: {
                  name: "index.ts"
                }
              } 
            ]
          },
        },
        {
          folder: {
            name: "routes",
            children: [
              {
                file: {
                  name: "index.ts"
                }
              } 
            ]
          },
        },
        {
          folder: {
            name: "validations",
            children: [
              {
                file: {
                  name: "index.ts"
                }
              } 
            ]
          },
        },
      ]
    }
  },
  {
    folder: {
      name: "DTOs",
    }
  },
  {
    folder: {
      name: "pipes",
    }
  },
  {
    folder: {
      name: "services",
      children: [
        {
          file: {
            name: "index.ts"
          }
        } 
      ]
    }
  }, 
  {
    folder: {
      name: "modules",
    }
  },   
  {
    folder: {
      name: "hooks",
    }
  },
  {
    file: {
      name: "types.d.ts"
    }
  }
];


export const _bootstrapProject = (rootFolderName: string) => {
  console.log(`bootstrapping project for ${rootFolderName}`);

  const _folderStructure: Project = [
    {
      folder: {
        name: rootFolderName,
        children: baseFolderStructure
      }
    }
  ];

  const bootstrap = (parentDir: string, folderStructure: Project) => {
    for (const folderOrFile of folderStructure){
      if ("folder" in folderOrFile){
        const folder = folderOrFile.folder;
        const folderName = parentDir + folder.name + "/";
        try {
          if (!existsSync(folderName)) {
            mkdirSync(folderName);
          }
        } catch (err) {
          console.error(err);
        }
        const children = folder.children;
        if (children){
          bootstrap(folderName, children);
        }
      }
      if ("file" in folderOrFile){
        const file = folderOrFile.file;
        const fileName = parentDir + file.name ;
        writeFileSync(fileName, "");
      }
    }    
  };

  bootstrap("src/", _folderStructure);
  console.log(`project ${rootFolderName} fully set up`);
};

export const bootstrapProject = (projectName_s: string | string[] ) => {
  if (Array.isArray(projectName_s)){
    for (const projectName of projectName_s){
      _bootstrapProject(projectName);
    }
  }else {
    _bootstrapProject(projectName_s);
  }
};
