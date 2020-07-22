import express from "express";

import {initialState as globalInitialState} from "../../common/store/global";
import {initialState as dynamicPropsInitialState} from "../../common/store/dynamic-props";
import {initialState as trendingTagsInitialState} from "../../common/store/trending-tags";
import {initialState as accountsInitialState} from "../../common/store/accounts";
import {initialState as communityInitialState} from "../../common/store/community";
import {initialState as transactionsInitialState} from "../../common/store/transactions";
import {initialState as usersInitialState} from "../../common/store/users";
import {initialState as activeUserInitialState} from "../../common/store/active-user";
import {initialState as reblogsInitialState} from "../../common/store/reblogs";
import {initialState as discussionInitialState} from "../../common/store/discussion";
import {initialState as uiInitialState} from "../../common/store/ui";
import {initialState as subscriptionsInitialState} from "../../common/store/subscriptions";

import {Entry} from "../../common/store/entries/types";

import {readGlobalCookies, getPromotedEntries, optimizeEntries} from "../helper";

import * as bridgeApi from "../../common/api/bridge";

import {render} from "../template";

export default async (req: express.Request, res: express.Response) => {
    const {author, permlink} = req.params;
    let entry: Entry | null = null;

    try {
        entry = await bridgeApi.getPost(author, permlink);
    } catch (e) {
    }

    let entries = {};

    if (entry) {
        entries = {
            [`__manual__`]: {
                entries: [entry],
                error: null,
                loading: false,
                hasMore: true,
            },
        };
    }

    const preLoadedState = {
        global: {
            ...globalInitialState,
            ...readGlobalCookies(req),
        },
        dynamicProps: dynamicPropsInitialState,
        trendingTags: {...trendingTagsInitialState},
        community: communityInitialState,
        accounts: [...accountsInitialState],
        transactions: {...transactionsInitialState},
        users: usersInitialState,
        activeUser: activeUserInitialState,
        reblogs: reblogsInitialState,
        discussion: discussionInitialState,
        ui: uiInitialState,
        subscriptions: subscriptionsInitialState,
        entries: {
            ...entries,
            ...{
                ['__promoted__']: {
                    entries: optimizeEntries(await getPromotedEntries()),
                    error: null,
                    loading: false,
                    hasMore: true,
                }
            }
        },
    };

    res.send(render(req, preLoadedState));
};
