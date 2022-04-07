// patterns //
// static: repeat pattern every 12 unit
// flashing: flash between different stages 
// shifting: shift same pattern from left to right

export const TagsColorMap = {
    "night": "#87b4d4",
    "morning": "#faeb46",
    "romantic": "#c587d4",
    "party": "#ed6542",
    "relax": "#6cf5d0"
}

export const TestData = [
    {
        name: "effect 1",
        pattern: "static",
        tags: ["night", "party"],
    },
    {
        name: "effect 2",
        pattern: "flashing",
        tags: ["night", "romantic"]
    },
    {
        name: "effect 3",
        pattern: "shifting",
        tags: ["morning", "romantic", "party", "relax"]
    },
    {
        name: "effect 4",
        pattern: "static",
        tags: ["morning", "relax"]
    },
    {
        name: "effect 5",
        pattern: "flashing",
        tags: ["relax"]
    },
    {
        name: "effect 6",
        pattern: "shifting",
        tags: ["night", "romantic"]
    },
    {
        name: "This is a super long name maybe this is dumb who knows lol",
        pattern: "static",
        tags: ["party"]
    },
    {
        name: "effect 8",
        pattern: "flashing",
        tags: ["night", "romantic"]
    },
    {
        name: "effect 9",
        pattern: "shifting",
        tags: ["morning"]
    },
    {
        name: "effect 10",
        pattern: "static",
        tags: ["night", "relax"]
    },
    {
        name: "effect 11",
        pattern: "flashing",
        tags: ["relax"]
    },
    {
        name: "effect 12",
        pattern: "shifting",
        tags: ["night", "romantic"]
    }
];