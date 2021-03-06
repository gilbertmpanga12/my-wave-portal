const main = async () => {
const waveContractFactory= await hre.ethers.getContractFactory("WavePortal");
const waveContract= await waveContractFactory.deploy();
await waveContract.deployed();
console.log("Contract deployed to: ", waveContract.address);

let waveCount;
waveCount = await waveContract.getTotalWaves();
console.log(waveCount.toNumber());

//send waves
let waveTxn = await waveContract.wave("Hey rat!!");
await waveTxn.wait();

const [owner, randomPerson] = await hre.ethers.getSigners();
waveTxn = await waveContract.connect(randomPerson).wave("Another message rat!");
await waveTxn.wait();

let allWaves = await waveContract.getAllWaves();
console.log(allWaves);

};

const runMain = async () => {
    try{
      await main();
      process.exit(0);
    }catch(error){
      console.log(error);
      process.exit(1);
    }
};

runMain();