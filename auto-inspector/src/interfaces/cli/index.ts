#!/usr/bin/env node

import { Command } from "commander";
import { startTest } from "./commands/index";
import { version } from "../../../package.json";

const program = new Command();

program.version(version).description("Magic Inspector API CLI"); 

program.addCommand(startTest);

program.parse(process.argv);
