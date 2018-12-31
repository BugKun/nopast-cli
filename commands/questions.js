module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: 'demo',
        filter(val) {
            return val.toLowerCase();
        },
        validate(val) {
            if (val === '') {
                return 'Project name is required!'
            } else if(!/[a-z]+/i.test(val)) {
                return 'Project name must include letters!'
            } else if(/\"|\'|\`|\s/.test(val)) {
                return `[\", \', \`, ] are illegal string!`
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'author',
        default: 'nopast',
        message: `Project's author:`,
        validate(val) {
            if (val === '') {
                return `Project's author is required!`
            } else if(/\"|\'|\`|\s/.test(val)) {
                return `[\", \', \`, ] are illegal string!`
            }else {
                return true
            }
        }
    },
    {
        type: 'list',
        name: 'library',
        message: `Choose a JavaScript library:`,
        choices: [
            "React",
            "Vue"
        ],
        validate(val) {
            if (val !== '') {
                return true
            }
            return `library choice is required!`
        },
    },
    {
        when({library}) {
            return library === "React"
        },
        type: 'list',
        name: 'type',
        message: `Choose a Project Type:`,
        choices: [
            "Component",
            "HOC",
            "Project"
        ],
        validate(val) {
            if (val !== '') {
                return true
            }
            return `library choice is required!`
        }
    },
    {
        when({library}) {
            return library === "Vue"
        },
        type: 'list',
        name: 'type',
        message: `Choose a Project Type:`,
        choices: [
            "Component",
            "Project"
        ],
        validate(val) {
            if (val !== '') {
                return true
            }
            return `library choice is required!`
        }
    }
];
