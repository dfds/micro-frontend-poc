import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

let config = new pulumi.Config();
let useLoadBalancer = config.getBoolean("useLoadBalancer");

// kafka-signalr-relay
const signalRLabels = { app: "kafka-signalr-relay", tier: "backend" };

const signalRDeployment = new k8s.apps.v1.Deployment("kafka-signalr-relay-deploy", {
    spec: {
        selector: { matchLabels: signalRLabels },
        replicas: 1,
        template: {
            metadata: { labels: signalRLabels },
            spec: { containers: [{ name: "kafka-signalr-relay", image: "toban/kafka-signalr-relay" }] }
        }
    }
});

export const name = signalRDeployment.metadata.name;

// BlasterV2
let blasterV2Labels = { app: "blaster-v2", tier: "frontend" };

let blasterV2Service = new k8s.core.v1.Service("blaster-v2-svc", {
    metadata: {
        name: "blaster-v2",
        labels: blasterV2Labels,
    },
    spec: {
        type: useLoadBalancer ? "LoadBalancer" : "ClusterIP",
        ports: [{ port: 80 }],
        selector: blasterV2Labels,
    },
});

let blasterV2Deployment = new k8s.apps.v1.Deployment("blaster-v2-deploy", {
    metadata: { name: "blaster-v2" },
    spec: {
        selector: { matchLabels: blasterV2Labels },
        replicas: 3,
        template: {
            metadata: { labels: blasterV2Labels },
            spec: {
                containers: [{
                    name: "blaster-v2-ui",
                    image: "toban/blaster-v2",
                    resources: {
                        requests: {
                            cpu: "100m",
                            memory: "100Mi",
                        },
                    },
                    ports: [{ containerPort: 80 }],
                }],
            },
        },
    },
});

export let blasterV2IP: pulumi.Output<string>;

if (useLoadBalancer) {
    blasterV2IP = blasterV2Service.status.apply(status => status.loadBalancer.ingress[0].ip);
} else {
    blasterV2IP = blasterV2Service.spec.apply(spec => spec.clusterIP);
}