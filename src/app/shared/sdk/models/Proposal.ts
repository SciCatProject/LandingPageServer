/* tslint:disable */

declare var Object: any;
export interface ProposalInterface {
  "proposalId": string;
  "pi_email"?: string;
  "pi_firstname"?: string;
  "pi_lastname"?: string;
  "email": string;
  "firstname"?: string;
  "lastname"?: string;
  "title"?: string;
  "abstract"?: string;
  "attachments"?: Array<any>;
  "ownerGroup": string;
  "accessGroups"?: Array<any>;
  "createdBy"?: string;
  "updatedBy"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "MeasurementPeriodList"?: Array<any>;
  measurementPeriods?: any[];
}

export class Proposal implements ProposalInterface {
  "proposalId": string;
  "pi_email": string;
  "pi_firstname": string;
  "pi_lastname": string;
  "email": string;
  "firstname": string;
  "lastname": string;
  "title": string;
  "abstract": string;
  "attachments": Array<any>;
  "ownerGroup": string;
  "accessGroups": Array<any>;
  "createdBy": string;
  "updatedBy": string;
  "createdAt": Date;
  "updatedAt": Date;
  "MeasurementPeriodList": Array<any>;
  measurementPeriods: any[];
  constructor(data?: ProposalInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Proposal`.
   */
  public static getModelName() {
    return "Proposal";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Proposal for dynamic purposes.
  **/
  public static factory(data: ProposalInterface): Proposal{
    return new Proposal(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Proposal',
      plural: 'Proposals',
      path: 'Proposals',
      idName: 'proposalId',
      properties: {
        "proposalId": {
          name: 'proposalId',
          type: 'string'
        },
        "pi_email": {
          name: 'pi_email',
          type: 'string'
        },
        "pi_firstname": {
          name: 'pi_firstname',
          type: 'string'
        },
        "pi_lastname": {
          name: 'pi_lastname',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "firstname": {
          name: 'firstname',
          type: 'string'
        },
        "lastname": {
          name: 'lastname',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "abstract": {
          name: 'abstract',
          type: 'string'
        },
        "attachments": {
          name: 'attachments',
          type: 'Array&lt;any&gt;'
        },
        "ownerGroup": {
          name: 'ownerGroup',
          type: 'string'
        },
        "accessGroups": {
          name: 'accessGroups',
          type: 'Array&lt;any&gt;'
        },
        "createdBy": {
          name: 'createdBy',
          type: 'string'
        },
        "updatedBy": {
          name: 'updatedBy',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "MeasurementPeriodList": {
          name: 'MeasurementPeriodList',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
      },
      relations: {
        measurementPeriods: {
          name: 'measurementPeriods',
          type: 'any[]',
          model: '',
          relationType: 'embedsMany',
                  keyFrom: 'MeasurementPeriodList',
          keyTo: 'id'
        },
      }
    }
  }
}
