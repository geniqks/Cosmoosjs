# CosmosJS

Homemade bootstrapper to enhance our bun.sh development experience

CosmosJs was developed following a mutual desire among friends to create an in-house solution and no longer depend on frameworks such as nestjs or adonisjs. We wanted to be able to do things simply and quickly, while eliminating repetitive tasks, leaving the developer a great deal of freedom and not overcomplicating certain tasks.

We don't presume to say we're a framework, we prefer to say we're an application bootstrapper.
At the moment we only intend to support Bun

# Troubleshooting

## Package resolve not working

As explained [here](https://github.com/oven-sh/bun/issues/5413#issuecomment-1723387463) you need to link the package because bun workspace implementation seems to be very buggy.

for more information [bun link](https://bun.sh/docs/cli/link)
