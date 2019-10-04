import { Identities } from "@arkecosystem/crypto";
import Command, { flags } from "@oclif/command";

import { CommandFlags } from "../types";
import { buildTransaction, processCommand, sharedFlags } from "../utils";

export class SecondSignatureRegistration extends Command {
    public static description = "Generate a Type 8 transaction";

    public static examples: string[] = [];

    public static flags: CommandFlags = {
        ...sharedFlags,
        recipient: flags.string({ default: "AHXtmB84sTZ9Zd35h9Y1vfFvPE2Xzqj8ri" }),
        amount: flags.string({ default: "200000000" }),
        secretHash: flags.string({
            default: "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
        }),
        expirationType: flags.integer({ default: 1 }),
        expirationValue: flags.integer({ default: Math.floor(Date.now() / 1000) }),
    };

    public async run(): Promise<void> {
        const { flags } = this.parse(SecondSignatureRegistration);

        processCommand(flags, () =>
            buildTransaction(flags, "htlcLock", builder =>
                builder
                    .htlcLockAsset({
                        secretHash: flags.secretHash as string,
                        expiration: {
                            type: flags.expirationType as number,
                            value: flags.expirationValue as number,
                        },
                    })
                    .recipientId(
                        (flags.recipient as string) || Identities.Address.fromPassphrase(flags.passphrase as string),
                    )
                    .amount(flags.amount as string),
            ),
        );
    }
}
