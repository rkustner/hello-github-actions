#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EcsRunnerStack } from '../lib/ecs-runner-stack';

const app = new cdk.App();
new EcsRunnerStack(app, 'EcsRunnerStack');
