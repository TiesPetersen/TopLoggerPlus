export async function getAllGyms() {
    const response = await fetch('https://app.toplogger.nu/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(
            [
                {
                    "operationName": "gyms",
                    "variables": {},
                    "query": "query gyms {\n  gyms {\n    ...gymsItem\n    __typename\n  }\n}\n\nfragment gymsItem on Gym {\n  id\n  iconPath\n  name\n  nameSlug\n  visible\n  countryCode\n  latitude\n  longitude\n  visibleSoon\n  bouldersEnabled\n  routesEnabled\n  climbTypeDefault\n  __typename\n}"
                }
            ]
        )
    })

    const data = await response.json()
    return data
}

export async function getBoulders(gymId) {
    const response = await fetch('https://app.toplogger.nu/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(
            [
                {
                    "operationName": "climbs",
                    "variables": {
                        "gymId": gymId,
                        "climbType": "boulder"
                    },
                    "query": "query climbs($gymId: ID!, $climbType: ClimbType!, $isReported: Boolean, $userId: ID, $compRoundId: ID) {\n  climbs(\n    gymId: $gymId\n    climbType: $climbType\n    isReported: $isReported\n    compRoundId: $compRoundId\n  ) {\n    data {\n      ...climb\n      ...climbWithClimbUser\n      ...climbWithCompRoundClimb\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment climbGroupClimb on ClimbGroupClimb {\n  id\n  climbGroupId\n  order\n  __typename\n}\n\nfragment climbUser on ClimbUser {\n  id\n  climbId\n  grade\n  rating\n  project\n  votedRenew\n  tickType\n  totalTries\n  triedFirstAtDate\n  tickedFirstAtDate\n  compClimbUser(compRoundId: $compRoundId) {\n    id\n    points\n    pointsJson\n    tickType\n    __typename\n  }\n  __typename\n}\n\nfragment compRoundClimb on CompRoundClimb {\n  id\n  points\n  pointsJson\n  leadRequired\n  __typename\n}\n\nfragment climb on Climb {\n  id\n  climbType\n  positionX\n  positionY\n  gradeAuto\n  grade\n  gradeVotesCount\n  gradeUsersVsAdmin\n  picPath\n  label\n  name\n  zones\n  remarksLoc\n  suitableForKids\n  clips\n  holds\n  height\n  overhang\n  leadEnabled\n  leadRequired\n  ratingsAverage\n  ticksCount\n  inAt\n  outAt\n  outPlannedAt\n  order\n  setterName\n  climbSetters {\n    id\n    gymAdmin {\n      id\n      name\n      picPath\n      __typename\n    }\n    __typename\n  }\n  wallId\n  wall {\n    id\n    nameLoc\n    labelX\n    labelY\n    __typename\n  }\n  wallSectionId\n  wallSection {\n    id\n    name\n    routesEnabled\n    positionX\n    positionY\n    __typename\n  }\n  holdColorId\n  holdColor {\n    id\n    color\n    colorSecondary\n    nameLoc\n    order\n    __typename\n  }\n  climbGroupClimbs {\n    ...climbGroupClimb\n    __typename\n  }\n  climbTagClimbs {\n    id\n    climbTagId\n    order\n    climbTag {\n      id\n      type\n      nameLoc\n      icon\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment climbWithClimbUser on Climb {\n  id\n  climbUser(userId: $userId) {\n    ...climbUser\n    __typename\n  }\n  __typename\n}\n\nfragment climbWithCompRoundClimb on Climb {\n  id\n  compRoundClimb(compRoundId: $compRoundId) {\n    ...compRoundClimb\n    __typename\n  }\n  __typename\n}"
                },
                {
                    "operationName": "gymForClimbs",
                    "variables": {
                        "gymId": gymId
                    },
                    "query": "query gymForClimbs($gymId: ID) {\n  gym(gymId: $gymId) {\n    ...gymForClimbs\n    __typename\n  }\n}\n\nfragment holdColor on HoldColor {\n  id\n  nameLoc\n  color\n  colorSecondary\n  __typename\n}\n\nfragment wall on Wall {\n  id\n  nameLoc\n  idOnFloorplan\n  height\n  overhang\n  bouldersEnabled\n  routesEnabled\n  climbTypeDefault\n  labelX\n  labelY\n  order\n  __typename\n}\n\nfragment wallSection on WallSection {\n  id\n  name\n  clips\n  height\n  overhang\n  bouldersEnabled\n  routesEnabled\n  climbTypeDefault\n  leadEnabled\n  leadRequired\n  autobelay\n  positionX\n  positionY\n  wallId\n  wall {\n    id\n    nameLoc\n    labelX\n    labelY\n    __typename\n  }\n  __typename\n}\n\nfragment setter on GymAdmin {\n  id\n  name\n  picPath\n  __typename\n}\n\nfragment climbGroupForIcon on ClimbGroup {\n  id\n  color\n  climbGroupBy\n  holdColor {\n    id\n    color\n    colorSecondary\n    __typename\n  }\n  __typename\n}\n\nfragment climbGroup on ClimbGroup {\n  id\n  nameLoc\n  descriptionLoc\n  color\n  climbGroupBy\n  climbType\n  holdColorId\n  holdColor {\n    id\n    color\n    colorSecondary\n    __typename\n  }\n  ...climbGroupForIcon\n  visible\n  order\n  __typename\n}\n\nfragment climbTag on ClimbTag {\n  id\n  type\n  nameLoc\n  icon\n  __typename\n}\n\nfragment gymForClimbs on Gym {\n  id\n  markBoulderNewDays\n  markRouteNewDays\n  markBoulderOutSoonDays\n  markRouteOutSoonDays\n  settingsLogBoulders\n  settingsLogRoutes\n  holdColors {\n    ...holdColor\n    __typename\n  }\n  walls {\n    ...wall\n    __typename\n  }\n  wallSections {\n    ...wallSection\n    __typename\n  }\n  setters {\n    ...setter\n    __typename\n  }\n  climbGroups {\n    ...climbGroup\n    __typename\n  }\n  climbTags {\n    ...climbTag\n    __typename\n  }\n  __typename\n}"
                }
            ]
        )
    })

    const data = await response.json()
    return data
}