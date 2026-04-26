interface IOption {
    Value: number;
    Label: {
        UserLocalizedLabel: {
            Label: string;
        };
    };
}

class Helper {

    public async getGlobalOptionSet(optionSetName: string): Promise<string | null> {

        try {
            const url =
                `${Xrm.Utility.getGlobalContext().getClientUrl()}/api/data/v9.2/GlobalOptionSetDefinitions(Name='${optionSetName}')`;

            const response = await fetch(url, {
                headers: {
                    "Accept": "application/json",
                    "OData-Version": "4.0"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: { Options: IOption[] } = await response.json();

            return data.Options?.map((o: IOption) => String(o.Value)).join("|") || null

        } catch (error) {
            console.error("Error fetching Global OptionSets:", error);
            return null
        }
    }
    public GetLocalOptionSet(attributeName: string): string | null {

        try {

            const attribute = Xrm.Page.getAttribute(attributeName) as Xrm.Attributes.OptionSetAttribute;

            if (!attribute) {
                return null;
            }

            const options = attribute.getOptions();

            if (!options || options.length === 0) {
                return null;
            }

            return options.map(o => String(o.value)).join("|") || null;

        } catch (error) {
            console.error("Error fetching Local OptionSet:", error);
            return null;
        }
    }
    public async GetAccountById(attr: string):Promise<number | null> {
        try {
            const accountAttr = Xrm.Page.getAttribute<Xrm.Attributes.LookupAttribute>(attr);
            if (!accountAttr) {
                throw new Error(`Attribute not found `);
            }
            const account = accountAttr.getValue() ?? null;
            if (!account) {
                throw new Error("Account is null");
            }
            const accountId = Array.isArray(account) ? account[0].id.replace("{", "").replace("}", "").toLowerCase() : "";

            const entityLogicalName = Array.isArray(account) ? account[0].entityType : "";

            const oQuery = `?$select=${entityLogicalName}id,vxter_languagecode`;

            const responseAccountById = await Xrm.WebApi.retrieveRecord(entityLogicalName, accountId, oQuery);

            if (typeof responseAccountById !== 'object' || Object.keys(responseAccountById).length === 0) {
                throw new Error("Not able tot retrieve account by id");
            }
            const accountLanguage = responseAccountById["vxter_languagecode"];
            return accountLanguage || null;
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

const helper = new Helper();
export default helper;