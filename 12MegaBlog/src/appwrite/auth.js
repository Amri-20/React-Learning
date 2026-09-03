import conf from "../config/conf";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({ userId: ID.unique(), email, password, name });

            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password });

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            // return null;
            if (error.code === 401) {
                return null;
            }

            console.log("Appwrite :: getCurrentUser :: error", error);
            return null;
        }


    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AppWrite serive :: logout :: error", error);
        }
    }
}


const authService = new AuthService()


export default authService