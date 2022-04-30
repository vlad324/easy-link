/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Verifier, VerifierInterface } from "../Verifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2]",
        name: "input",
        type: "uint256[2]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "r",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611a29806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063f5c9d69e14610030575b600080fd5b61004a600480360381019061004591906114d1565b610060565b6040516100579190611555565b60405180910390f35b600061006a611152565b60405180604001604052808760006002811061008957610088611570565b5b60200201518152602001876001600281106100a7576100a6611570565b5b6020020151815250816000018190525060405180604001604052806040518060400160405280886000600281106100e1576100e0611570565b5b60200201516000600281106100f9576100f8611570565b5b602002015181526020018860006002811061011757610116611570565b5b602002015160016002811061012f5761012e611570565b5b6020020151815250815260200160405180604001604052808860016002811061015b5761015a611570565b5b602002015160006002811061017357610172611570565b5b602002015181526020018860016002811061019157610190611570565b5b60200201516001600281106101a9576101a8611570565b5b602002015181525081525081602001819052506040518060400160405280856000600281106101db576101da611570565b5b60200201518152602001856001600281106101f9576101f8611570565b5b602002015181525081604001819052506000600267ffffffffffffffff811115610226576102256112b9565b5b6040519080825280602002602001820160405280156102545781602001602082028036833780820191505090505b50905060005b60028110156102ad5784816002811061027657610275611570565b5b602002015182828151811061028e5761028d611570565b5b60200260200101818152505080806102a5906115ce565b91505061025a565b5060006102ba82846102d9565b036102ca576001925050506102d1565b6000925050505b949350505050565b6000807f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001905060006103096104cc565b90508060800151516001865161031f9190611616565b1461035f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610356906116c9565b60405180910390fd5b60006040518060400160405280600081526020016000815250905060005b865181101561044e578387828151811061039a57610399611570565b5b6020026020010151106103e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d990611735565b60405180910390fd5b6104398261043485608001516001856103fb9190611616565b8151811061040c5761040b611570565b5b60200260200101518a858151811061042757610426611570565b5b6020026020010151610948565b610a20565b91508080610446906115ce565b91505061037d565b5061047881836080015160008151811061046b5761046a611570565b5b6020026020010151610a20565b90506104ae61048a8660000151610b1e565b8660200151846000015185602001518587604001518b604001518960600151610bc3565b6104be57600193505050506104c6565b600093505050505b92915050565b6104d4611185565b60405180604001604052807f2d4d9aa7e302d9df41749d5507949d05dbea33fbb16c643b22f599a2be6df2e281526020017f14bedd503c37ceb061d8ec60209fe345ce89830a19230301f076caff004d19268152508160000181905250604051806040016040528060405180604001604052807f0967032fcbf776d1afc985f88877f182d38480a653f2decaa9794cbc3bf3060c81526020017f0e187847ad4c798374d0d6732bf501847dd68bc0e071241e0213bc7fc13db7ab815250815260200160405180604001604052807f304cfbd1e08a704a99f5e847d93f8c3caafddec46b7a0d379da69a4d112346a781526020017f1739c1b1a457a8c7313123d24d2f9192f896b7c63eea05a9d57f06547ad0cec88152508152508160200181905250604051806040016040528060405180604001604052807f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c281526020017f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed815250815260200160405180604001604052807f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b81526020017f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa8152508152508160400181905250604051806040016040528060405180604001604052807f0e7b3e986ac32e5ba2767a4ec77fe3669b158cb135edeff36ab1e5595702b96381526020017f1f195f21bfb4602fcc4ae1d778ca6748e5159fe7210774225e66b45e346c289e815250815260200160405180604001604052807f14b7f6cc1b93e03912284dfd1ff567220554b44627e2159deefe3a14f842587681526020017f29ab96d59f51d539ffd43d78172fc9e58dcb89c703f0029cf5dfdde2a22c3d278152508152508160600181905250600367ffffffffffffffff81111561079b5761079a6112b9565b5b6040519080825280602002602001820160405280156107d457816020015b6107c16111cc565b8152602001906001900390816107b95790505b50816080018190525060405180604001604052807f25d1cd0f591ca25a1b2c1abec0e0334097185a0c61519c5981f1f7148d66205081526020017f2711da9a2f5fc9fedd1d00019d34ea3646154101362f8cb409d8471d8cdbbc6e815250816080015160008151811061084a57610849611570565b5b602002602001018190525060405180604001604052807f0fc9e5fb4c505619ef0516a83999cd90d198f7c94f61baa504d2d9cbd789b71c81526020017f081a0d7900b00717bd9c0775ae1cd3f7ba85c972b9b7499bbff9c6fcf769161081525081608001516001815181106108c2576108c1611570565b5b602002602001018190525060405180604001604052807f204bb2374829fdd1b107c83af49396fc305a49012f1f6bb4a3445142301fde3281526020017f0ff4a2a4d97a2dc38642fd0c80e8db09542cf30d2ff6190831536b455bec31a8815250816080015160028151811061093a57610939611570565b5b602002602001018190525090565b6109506111cc565b6109586111e6565b83600001518160006003811061097157610970611570565b5b60200201818152505083602001518160016003811061099357610992611570565b5b60200201818152505082816002600381106109b1576109b0611570565b5b602002018181525050600060608360808460076107d05a03fa905080600081036109d757fe5b5080610a18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0f906117a1565b60405180910390fd5b505092915050565b610a286111cc565b610a30611208565b836000015181600060048110610a4957610a48611570565b5b602002018181525050836020015181600160048110610a6b57610a6a611570565b5b602002018181525050826000015181600260048110610a8d57610a8c611570565b5b602002018181525050826020015181600360048110610aaf57610aae611570565b5b602002018181525050600060608360c08460066107d05a03fa90508060008103610ad557fe5b5080610b16576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0d9061180d565b60405180910390fd5b505092915050565b610b266111cc565b60007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47905060008360000151148015610b63575060008360200151145b15610b87576040518060400160405280600081526020016000815250915050610bbe565b604051806040016040528084600001518152602001828560200151610bac919061185c565b83610bb7919061188d565b8152509150505b919050565b600080600467ffffffffffffffff811115610be157610be06112b9565b5b604051908082528060200260200182016040528015610c1a57816020015b610c076111cc565b815260200190600190039081610bff5790505b5090506000600467ffffffffffffffff811115610c3a57610c396112b9565b5b604051908082528060200260200182016040528015610c7357816020015b610c6061122a565b815260200190600190039081610c585790505b5090508a82600081518110610c8b57610c8a611570565b5b60200260200101819052508882600181518110610cab57610caa611570565b5b60200260200101819052508682600281518110610ccb57610cca611570565b5b60200260200101819052508482600381518110610ceb57610cea611570565b5b60200260200101819052508981600081518110610d0b57610d0a611570565b5b60200260200101819052508781600181518110610d2b57610d2a611570565b5b60200260200101819052508581600281518110610d4b57610d4a611570565b5b60200260200101819052508381600381518110610d6b57610d6a611570565b5b6020026020010181905250610d808282610d90565b9250505098975050505050505050565b60008151835114610dd6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dcd9061190d565b60405180910390fd5b6000835190506000600682610deb919061192d565b905060008167ffffffffffffffff811115610e0957610e086112b9565b5b604051908082528060200260200182016040528015610e375781602001602082028036833780820191505090505b50905060005b838110156110bc57868181518110610e5857610e57611570565b5b602002602001015160000151826000600684610e74919061192d565b610e7e9190611616565b81518110610e8f57610e8e611570565b5b602002602001018181525050868181518110610eae57610ead611570565b5b602002602001015160200151826001600684610eca919061192d565b610ed49190611616565b81518110610ee557610ee4611570565b5b602002602001018181525050858181518110610f0457610f03611570565b5b602002602001015160000151600060028110610f2357610f22611570565b5b6020020151826002600684610f38919061192d565b610f429190611616565b81518110610f5357610f52611570565b5b602002602001018181525050858181518110610f7257610f71611570565b5b602002602001015160000151600160028110610f9157610f90611570565b5b6020020151826003600684610fa6919061192d565b610fb09190611616565b81518110610fc157610fc0611570565b5b602002602001018181525050858181518110610fe057610fdf611570565b5b602002602001015160200151600060028110610fff57610ffe611570565b5b6020020151826004600684611014919061192d565b61101e9190611616565b8151811061102f5761102e611570565b5b60200260200101818152505085818151811061104e5761104d611570565b5b60200260200101516020015160016002811061106d5761106c611570565b5b6020020151826005600684611082919061192d565b61108c9190611616565b8151811061109d5761109c611570565b5b60200260200101818152505080806110b4906115ce565b915050610e3d565b506110c5611250565b6000602082602086026020860160086107d05a03fa905080600081036110e757fe5b5080611128576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111f906119d3565b60405180910390fd5b60008260006001811061113e5761113d611570565b5b602002015114159550505050505092915050565b60405180606001604052806111656111cc565b815260200161117261122a565b815260200161117f6111cc565b81525090565b6040518060a001604052806111986111cc565b81526020016111a561122a565b81526020016111b261122a565b81526020016111bf61122a565b8152602001606081525090565b604051806040016040528060008152602001600081525090565b6040518060600160405280600390602082028036833780820191505090505090565b6040518060800160405280600490602082028036833780820191505090505090565b604051806040016040528061123d611272565b815260200161124a611272565b81525090565b6040518060200160405280600190602082028036833780820191505090505090565b6040518060400160405280600290602082028036833780820191505090505090565b6000604051905090565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6112f1826112a8565b810181811067ffffffffffffffff821117156113105761130f6112b9565b5b80604052505050565b6000611323611294565b905061132f82826112e8565b919050565b600067ffffffffffffffff82111561134f5761134e6112b9565b5b602082029050919050565b600080fd5b6000819050919050565b6113728161135f565b811461137d57600080fd5b50565b60008135905061138f81611369565b92915050565b60006113a86113a384611334565b611319565b905080602084028301858111156113c2576113c161135a565b5b835b818110156113eb57806113d78882611380565b8452602084019350506020810190506113c4565b5050509392505050565b600082601f83011261140a576114096112a3565b5b6002611417848285611395565b91505092915050565b600067ffffffffffffffff82111561143b5761143a6112b9565b5b602082029050919050565b600061145961145484611420565b611319565b905080604084028301858111156114735761147261135a565b5b835b8181101561149c578061148888826113f5565b845260208401935050604081019050611475565b5050509392505050565b600082601f8301126114bb576114ba6112a3565b5b60026114c8848285611446565b91505092915050565b60008060008061014085870312156114ec576114eb61129e565b5b60006114fa878288016113f5565b945050604061150b878288016114a6565b93505060c061151c878288016113f5565b92505061010061152e878288016113f5565b91505092959194509250565b60008115159050919050565b61154f8161153a565b82525050565b600060208201905061156a6000830184611546565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006115d98261135f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361160b5761160a61159f565b5b600182019050919050565b60006116218261135f565b915061162c8361135f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156116615761166061159f565b5b828201905092915050565b600082825260208201905092915050565b7f76657269666965722d6261642d696e7075740000000000000000000000000000600082015250565b60006116b360128361166c565b91506116be8261167d565b602082019050919050565b600060208201905081810360008301526116e2816116a6565b9050919050565b7f76657269666965722d6774652d736e61726b2d7363616c61722d6669656c6400600082015250565b600061171f601f8361166c565b915061172a826116e9565b602082019050919050565b6000602082019050818103600083015261174e81611712565b9050919050565b7f70616972696e672d6d756c2d6661696c65640000000000000000000000000000600082015250565b600061178b60128361166c565b915061179682611755565b602082019050919050565b600060208201905081810360008301526117ba8161177e565b9050919050565b7f70616972696e672d6164642d6661696c65640000000000000000000000000000600082015250565b60006117f760128361166c565b9150611802826117c1565b602082019050919050565b60006020820190508181036000830152611826816117ea565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006118678261135f565b91506118728361135f565b9250826118825761188161182d565b5b828206905092915050565b60006118988261135f565b91506118a38361135f565b9250828210156118b6576118b561159f565b5b828203905092915050565b7f70616972696e672d6c656e677468732d6661696c656400000000000000000000600082015250565b60006118f760168361166c565b9150611902826118c1565b602082019050919050565b60006020820190508181036000830152611926816118ea565b9050919050565b60006119388261135f565b91506119438361135f565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561197c5761197b61159f565b5b828202905092915050565b7f70616972696e672d6f70636f64652d6661696c65640000000000000000000000600082015250565b60006119bd60158361166c565b91506119c882611987565b602082019050919050565b600060208201905081810360008301526119ec816119b0565b905091905056fea264697066735822122031c87b41bf7d29dfe5219ec85bab92ca3ef24fbbbd679e8777f1e73149ebef7c64736f6c634300080d0033";

type VerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Verifier__factory extends ContractFactory {
  constructor(...args: VerifierConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Verifier> {
    return super.deploy(overrides || {}) as Promise<Verifier>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Verifier {
    return super.attach(address) as Verifier;
  }
  override connect(signer: Signer): Verifier__factory {
    return super.connect(signer) as Verifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VerifierInterface {
    return new utils.Interface(_abi) as VerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Verifier {
    return new Contract(address, _abi, signerOrProvider) as Verifier;
  }
}