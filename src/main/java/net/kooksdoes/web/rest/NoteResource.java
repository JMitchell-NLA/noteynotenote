package net.kooksdoes.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import net.kooksdoes.domain.Note;
import net.kooksdoes.repository.NoteRepository;
import net.kooksdoes.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link net.kooksdoes.domain.Note}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NoteResource {
    private final Logger log = LoggerFactory.getLogger(NoteResource.class);

    private static final String ENTITY_NAME = "note";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NoteRepository noteRepository;

    public NoteResource(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    /**
     * {@code POST  /notes} : Create a new note.
     *
     * @param note the note to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new note, or with status {@code 400 (Bad Request)} if the note has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notes")
    public ResponseEntity<Note> createNote(@RequestBody Note note) throws URISyntaxException {
        log.debug("REST request to save Note : {}", note);
        if (note.getId() != null) {
            throw new BadRequestAlertException("A new note cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Note result = noteRepository.save(note);
        return ResponseEntity
            .created(new URI("/api/notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /notes} : Updates an existing note.
     *
     * @param note the note to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated note,
     * or with status {@code 400 (Bad Request)} if the note is not valid,
     * or with status {@code 500 (Internal Server Error)} if the note couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/notes")
    public ResponseEntity<Note> updateNote(@RequestBody Note note) throws URISyntaxException {
        log.debug("REST request to update Note : {}", note);
        if (note.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Note result = noteRepository.save(note);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, note.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /notes} : get all the notes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of notes in body.
     */
    @GetMapping("/notes")
    public List<Note> getAllNotes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Notes");
        return noteRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /notes/:id} : get the "id" note.
     *
     * @param id the id of the note to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the note, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getNote(@PathVariable Long id) {
        log.debug("REST request to get Note : {}", id);
        Optional<Note> note = noteRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(note);
    }

    /**
     * {@code DELETE  /notes/:id} : delete the "id" note.
     *
     * @param id the id of the note to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        log.debug("REST request to delete Note : {}", id);
        noteRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
