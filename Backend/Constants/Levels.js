const getLevel = (level) => {
    switch (level) {
        case "No Record":
            return -1;
        case "Story":
            return 4;
        case "Paragraph":
            return 3;
        case "Sentence":
            return 2;
        case "Word":
            return 1;
        default:
            return 0;
    }
}
module.exports = getLevel;