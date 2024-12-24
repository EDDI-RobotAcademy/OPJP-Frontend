import { MutationTree } from "vuex";
import { AccountState, Account } from "./states";
import { REQUEST_NICKNAME_TO_DJANGO, REQUEST_EMAIL_TO_DJANGO, REQUEST_GENDER_TO_DJANGO, REQUEST_BIRTHYEAR_TO_DJANGO } from "./mutation-types";


export interface AccountMutations extends MutationTree<AccountState> {
    [REQUEST_NICKNAME_TO_DJANGO](state: AccountState, receivedDate: Account): void
    [REQUEST_EMAIL_TO_DJANGO](state: AccountState, receivedDate: Account): void
    [REQUEST_GENDER_TO_DJANGO](state: AccountState, receivedDate: Account): void
    [REQUEST_BIRTHYEAR_TO_DJANGO](state: AccountState, receivedDate: Account): void
}

const mutations: MutationTree<AccountState> = {
    [REQUEST_NICKNAME_TO_DJANGO](state: AccountState, receivedDate: Account): void {
        state.account = receivedDate
    },
    [REQUEST_EMAIL_TO_DJANGO](state: AccountState, receivedDate: Account): void {
        state.account = receivedDate
    },
    [REQUEST_GENDER_TO_DJANGO](state: AccountState, receivedDate: Account): void {
        state.account = receivedDate
    },
    [REQUEST_BIRTHYEAR_TO_DJANGO](state: AccountState, receivedDate: Account): void {
        state.account = receivedDate
    }
}

export default mutations as AccountMutations