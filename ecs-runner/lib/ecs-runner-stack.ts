import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as iam from '@aws-cdk/aws-iam';
import { AwsLogDriver } from '@aws-cdk/aws-ecs';

export class EcsRunnerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const secretAccessPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['secretsmanager:GetSecretValue'],
      resources: ['arn:aws:secretsmanager:eu-west-1:*:secret:githubtoken*']
    })

    const CWLogsPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['logs:Get*', 'logs:Put*', 'logs:List*'],
      resources: ['*']
    })

    const runner_image = ecs.ContainerImage.fromAsset("./src")
    const cluster = new ecs.Cluster(this, 'Cluster', {})
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FargateTaskDefinition', {})
    taskDefinition.addToTaskRolePolicy(secretAccessPolicy)
    taskDefinition.addToTaskRolePolicy(CWLogsPolicy)
    taskDefinition.addContainer('runnerImage', {
      image: runner_image,
      environment: {
        'RUNNER_NAME': 'ecs-runner', 
        'RUNNER_REPOSITORY_URL': 'https://github.com/rkustner/hello-github-actions'},
      logging: new ecs.AwsLogDriver({streamPrefix: 'runnerLogs'})
    })
    new ecs.FargateService(this, 'runnerFargateService', {
      cluster: cluster,
      taskDefinition: taskDefinition,
      desiredCount: 1,
    })
  }
}
