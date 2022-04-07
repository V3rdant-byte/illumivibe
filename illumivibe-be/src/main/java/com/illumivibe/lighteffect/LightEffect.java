package com.illumivibe.lighteffect;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

@Document("lighteffects")
public class LightEffect {
    @Id
    public String id;
    @JsonIgnore
    public String owner;
    @JsonIgnore
    public boolean shared;

    public String name;
    public List<String> tags;
    public int period;
    public String pattern;
    public List<List<String>> content;

    Update convertToUpdate() {
        Update update = new Update();
        if (name != null && !name.isBlank())
            update.set("name", name);
        if (tags != null)
            update.set("tags", tags);
        if (period != 0)
            update.set("period", period);
        if (pattern != null && !pattern.isBlank())
            update.set("pattern", pattern);
        if (content != null)
            update.set("content", content);
        return update;
    }
}
