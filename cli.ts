import yargs from 'yargs';
import { Pet, calculateRequiredBox } from '.';

async function runCLI() {
    const args = await yargs
        .option('petTypeList', {
            describe: 'Pet type list',
            demandOption: true,
            type: 'string',
        }).argv;

    const petTypeList = args.petTypeList as string;
    const petTypeListArr: Pet[] = petTypeList.split(",").map(item => {
        if (!Object.keys(Pet).includes(item)) throw new Error("CLI Parameter Error: Unidentified item in `petTypeList`.");
        return Pet[item];
    });
    console.log(calculateRequiredBox(petTypeListArr));
}

runCLI();