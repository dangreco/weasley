# Weasley (Card)
___

![Weasley (Card)](https://github.com/dangreco/weasley/raw/master/screenshots/card.png)



## About
This card allows you to set up a "Weasley Clock"-like card for Home Assistant. 
It shows the location of tracked entities, alongside their name, picutre, and last update time.

## Configuration
Example config:
```yaml

# --------------
# Required stuff
# --------------

type: custom:weasley-card
entities:
  - person.ron
  - person.arthur

# --------------
# Optional stuff
# --------------

# The list of zones to always track
groups: 
  - Hogwarts
  - Work

# Show the person's first name only
first_name_only: true

# What to call the 'unknown' state/zone
misc_group_name: The Wizarding World

```
