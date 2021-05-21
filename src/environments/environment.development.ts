// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=development` then `environment.development.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  accessDataHref:
    "https://www.psi.ch/en/photon-science-data-services/slsswissfel-data-transfer",
  accessInstructions:
    "To access the data associated with this DOI click below and follow the instructions",
  directMongoAccess: false,
  doiBaseUrl: "https://doi.org/",
  facility: "psi",
  lbApiVersion: null,
  lbBaseURL: "https://doi2.psi.ch:3001",
  oaiProviderRoute: "https://doi2.psi.ch/oaipmh/Publication",
  production: true,
  scicatBaseUrl: null,
  showLogoBanner: false
};
