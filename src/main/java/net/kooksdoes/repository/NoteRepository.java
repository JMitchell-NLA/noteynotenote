package net.kooksdoes.repository;

import java.util.List;
import java.util.Optional;
import net.kooksdoes.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Note entity.
 */
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    @Query("select note from Note note where note.assignedTo.login = ?#{principal.preferredUsername}")
    List<Note> findByAssignedToIsCurrentUser();

    @Query(
        value = "select distinct note from Note note left join fetch note.tags",
        countQuery = "select count(distinct note) from Note note"
    )
    Page<Note> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct note from Note note left join fetch note.tags")
    List<Note> findAllWithEagerRelationships();

    @Query("select note from Note note left join fetch note.tags where note.id =:id")
    Optional<Note> findOneWithEagerRelationships(@Param("id") Long id);
}
