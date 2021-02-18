import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as EcsRunner from '../lib/ecs-runner-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new EcsRunner.EcsRunnerStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
