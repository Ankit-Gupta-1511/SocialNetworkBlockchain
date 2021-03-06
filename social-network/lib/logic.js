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

/**
 * Sample transaction
 * @param {org.example.socialnetwork.subscription} subscription - the profile the subscriber and the business to which the person will subscribe
 * @transaction
 */
async function subscription(subscription) {

    console.log("subscription profile:\n");
    console.log(subscription.profile);

    if(subscription.profile.subscribedTo)
        subscription.profile.subscribedTo.push(subscription.businessUser);
    else
        subscription.profile.subscribedTo = [subscription.businessUser];    

    const assetRegistry = await getAssetRegistry('org.example.socialnetwork.Profile');
    await assetRegistry.update(subscription.profile);

}

/**
 * Sample transaction
 * @param {org.example.socialnetwork.sharePost} share - the profile the subscriber and the business to which the person will subscribe
 * @transaction
 */
async function subscription(share) {

    console.log("subscription profile:\n");
    console.log(share.post);

    if(share.post.sharedTo)
        share.post.sharedTo.push(share.user);
    else
        share.post.sharedTo = [share.user];    

    const assetRegistry = await getAssetRegistry('org.example.socialnetwork.Post');
    await assetRegistry.update(share.post);

}

