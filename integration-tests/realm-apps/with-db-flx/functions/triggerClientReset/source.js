////////////////////////////////////////////////////////////////////////////
//
// Copyright 2022 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

/* eslint-env node */
/* global context */

exports = async function (appId, userId) {
  return (await deleteClientFile(`__realm_sync_${appId}`, userId)) || (await deleteClientFile(`__realm_sync`, userId));
};

async function deleteClientFile(db, userId) {
  const mongodb = context.services.get("mongodb");
  return (await mongodb.db(db).collection("clientfiles").deleteMany({ ownerId: userId })).deletedCount > 0;
}
