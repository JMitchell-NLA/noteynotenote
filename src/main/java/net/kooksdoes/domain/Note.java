package net.kooksdoes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Note.
 */
@Entity
@Table(name = "note")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Note implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "title")
    private String title;

    @Column(name = "xpos")
    private Double xpos;

    @Column(name = "ypos")
    private Double ypos;

    @ManyToOne
    @JsonIgnoreProperties(value = "notes", allowSetters = true)
    private User assignedTo;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(
        name = "note_tag",
        joinColumns = @JoinColumn(name = "note_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
    )
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public Note content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public Note title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getXpos() {
        return xpos;
    }

    public Note xpos(Double xpos) {
        this.xpos = xpos;
        return this;
    }

    public void setXpos(Double xpos) {
        this.xpos = xpos;
    }

    public Double getYpos() {
        return ypos;
    }

    public Note ypos(Double ypos) {
        this.ypos = ypos;
        return this;
    }

    public void setYpos(Double ypos) {
        this.ypos = ypos;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public Note assignedTo(User user) {
        this.assignedTo = user;
        return this;
    }

    public void setAssignedTo(User user) {
        this.assignedTo = user;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Note tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Note addTag(Tag tag) {
        this.tags.add(tag);
        tag.getNotes().add(this);
        return this;
    }

    public Note removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getNotes().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Note)) {
            return false;
        }
        return id != null && id.equals(((Note) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Note{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", title='" + getTitle() + "'" +
            ", xpos=" + getXpos() +
            ", ypos=" + getYpos() +
            "}";
    }
}
