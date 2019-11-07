import { Identities } from "@arkecosystem/crypto";
import Command, { flags } from "@oclif/command";

import { CommandFlags } from "../types";
import { buildTransaction, processCommand, sharedFlags } from "../utils";

export class Transfer extends Command {
    public static description = "Generate a Type 0 transaction";

    public static examples: string[] = [];

    public static flags: CommandFlags = {
        ...sharedFlags,
        recipient: flags.string({ default: "AHXtmB84sTZ9Zd35h9Y1vfFvPE2Xzqj8ri" }),
        amount: flags.string({ default: "200000000" }),
    };

    public async run(): Promise<void> {
        const { flags } = this.parse(Transfer);

        processCommand(flags, () =>
            buildTransaction(flags, "transfer", builder =>
                builder
                    .recipientId(
                        (flags.recipient as string) || Identities.Address.fromPassphrase(flags.passphrase as string),
                    )
                    .amount(flags.amount as string),
            ),
        );
    }
}