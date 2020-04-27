exports.getCmdArgsContext = () => {
    const arguments = process.argv.slice(2);
    const argsContext = {};
    if (arguments.length > 0) {
        arguments.forEach(arg => {
            const cleanArg = arg.trim().toLowerCase();
            if (arg === '-verbose' || arg === '--verbose') {
                argsContext.verbose = true;
            }
        });
    }
    return argsContext;
};