export enum Box { B1 = 1, B2 = 2, B3 = 4 };
export enum Pet { R = 1, H = 1, M = 2, S = 3, };

/**
 * Processing Logic
 * 1. Efficiently pack into B3: Match `S` items with any `R,H` found \
 * 2. Sort (desc) remaining `M, H, R` \
 * 3. Increment B3: items will be counted for every `M, H, R` \
 * 4. Increment B2: items will be counted for every `M, H, R` \
 * 5. Increment B1: remaining items will be counted `H, R` \
 * 
 * @param {Pet[]} pet 
 * @returns 
 */
export const calculateRequiredBox = (pet: Pet[]) => {
    // filter by type of pet
    let tmpRH = pet.filter(pet => [Pet.R, Pet.H].includes(pet)).length;
    let tmpM = pet.filter(pet => [Pet.M].includes(pet)).length;
    let tmpS = pet.filter(pet => [Pet.S].includes(pet)).length;

    // 1. Efficiently pack into B3: Match `S` items with any `R,H` found \
    if (tmpS > 0 && tmpRH > 0) tmpRH -= tmpS; // subtract remaining `H, R`

    // 2. Sorted (desc) remaining `M, H, R`
    const remainingArr = [];
    if (tmpRH > 0) remainingArr.push(...Array(tmpRH).fill(Pet.R));
    if (tmpM > 0) remainingArr.push(...Array(tmpM).fill(Pet.M));

    // 3. Increment B3: items will be counted for every `M, H, R`
    let sum = 0;
    for (let i = remainingArr.length - 1; i > 0; i--) {
        sum += remainingArr[i];
        if (sum === 4) {
            sum = 0;
            remainingArr.splice(i);
            tmpS++; // increment B3
        }
    }

    let sumTotal = remainingArr.reduce((acc, currentValue) => acc + currentValue, 0);
    if (sumTotal > Box.B2) {
        tmpRH = 0;
        tmpM = 0;
        tmpS++; // increment B3
    }
    else {
        // 4. Increment B2: items will be counted for every `M, H, R`
        tmpM = remainingArr.filter(pet => [Pet.M].includes(pet)).length;
    }

    const result = {
        B1: (tmpRH > 0) ? tmpRH : 0,
        B2: (tmpM > 0) ? tmpM : 0,
        B3: (tmpS > 0) ? tmpS : 0
    };

    const boxResult = [
        ...Array(result.B1).fill("B1"),
        ...Array(result.B2).fill("B2"),
        ...Array(result.B3).fill("B3")
    ].join(",");

    return boxResult;
}

// Example usage:
// console.log("R\t",        calcBoxes([Pet.R]));
// console.log("H\t",        calcBoxes([Pet.H]));
// console.log("M\t",        calcBoxes([Pet.M]));
// console.log("S\t",        calcBoxes([Pet.S]));
// console.log("R H H\t",    calcBoxes([Pet.R, Pet.H, Pet.H]));
// console.log("S M\t",      calcBoxes([Pet.S, Pet.M]));
// console.log("S H R M\t",  calcBoxes([Pet.S, Pet.H, Pet.R, Pet.M]));
// console.log("R H S\t",    calcBoxes([Pet.R, Pet.H, Pet.S]));