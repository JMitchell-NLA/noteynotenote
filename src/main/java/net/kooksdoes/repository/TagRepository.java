package net.kooksdoes.repository;

import java.util.List;
import net.kooksdoes.domain.Tag;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("select tag from Tag tag where tag.assignedTo.login = ?#{principal.preferredUsername}")
    List<Tag> findByAssignedToIsCurrentUser();
}
