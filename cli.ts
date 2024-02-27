import yargs from 'yargs';
import { Pet, calculateRequiredBox } from '.';

export const parsePetTypeListParam = (petTypeList: string): Pet[] => {
    const petTypeListArr: Pet[] = petTypeList.split(",").map((item:string) => {
        if (!Object.keys(Pet).includes(item)) throw new Error("CLI Parameter Error: Unidentified item in `petTypeList`.");
        return Pet[item as keyof typeof Pet];
    });

    return petTypeListArr;
}

export async function runCLI() {
    const args = await yargs
        .option('petTypeList', {
            describe: 'Pet type list',
            demandOption: true,
            type: 'string',
        }).argv;

    const petTypeList = args.petTypeList as string;
    const pets: Pet[] = parsePetTypeListParam(petTypeList);

    console.log(calculateRequiredBox(pets));
}

runCLI();