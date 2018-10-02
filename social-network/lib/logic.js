/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */


const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

/*
 * Follow transaction
 * @param {social.network.follow} tx
 * @transaction
 */

async function follow(tx) {
    // adding the business user to the array of business users in the asset 
    tx.profile.subscribedTo.push(tx.businessUser);
    tx.businessUser.followers.push(tx.profile.owner);
    
    // getting the asset registry
    let assetRegistry = await getAssetRegistry('social.network.Profile');
    //updating the registry
    await assetRegistry.update(tx.profile);
}

/*
 * Follow transaction
 * @param {social.network.makeFriend} tx
 * @transaction
 */

async function makeFriend(tx) {
    tx.user1.profile.friends.append(tx.user2);
    tx.user2.profile.friends.append(tx.user1);

    // getting the asset registry
    let assetRegistry = await getAssetRegistry('social.network.Profile');

    //updating the registry
    await assetRegistry.update(tx.user1.profile);
    await assetRegistry.update(tx.user2.profile);
}