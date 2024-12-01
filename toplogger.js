export async function getAllGyms() {
    const response = await fetch('https://app.toplogger.nu/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'content-length': 322,
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