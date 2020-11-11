import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './note.reducer';
import { INote } from 'app/shared/model/note.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NoteDetail = (props: INoteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { noteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="noteyboiApp.note.detail.title">Note</Translate> [<b>{noteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="content">
              <Translate contentKey="noteyboiApp.note.content">Content</Translate>
            </span>
          </dt>
          <dd>{noteEntity.content}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="noteyboiApp.note.title">Title</Translate>
            </span>
          </dt>
          <dd>{noteEntity.title}</dd>
          <dt>
            <span id="xpos">
              <Translate contentKey="noteyboiApp.note.xpos">Xpos</Translate>
            </span>
          </dt>
          <dd>{noteEntity.xpos}</dd>
          <dt>
            <span id="ypos">
              <Translate contentKey="noteyboiApp.note.ypos">Ypos</Translate>
            </span>
          </dt>
          <dd>{noteEntity.ypos}</dd>
          <dt>
            <Translate contentKey="noteyboiApp.note.assignedTo">Assigned To</Translate>
          </dt>
          <dd>{noteEntity.assignedTo ? noteEntity.assignedTo.login : ''}</dd>
          <dt>
            <Translate contentKey="noteyboiApp.note.tag">Tag</Translate>
          </dt>
          <dd>
            {noteEntity.tags
              ? noteEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {noteEntity.tags && i === noteEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/note" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/note/${noteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ note }: IRootState) => ({
  noteEntity: note.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
