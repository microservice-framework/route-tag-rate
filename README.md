# route-tag-rate
Provide tag "rate". Easy to use tag that vote to route traffic based on rate


Example config: 
```
{
  tag: "rate-10",
  config: {
    voteSize: 10,
    rate: 0.1
  },
  handler: "route-tag-rate"
}
```
