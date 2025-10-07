import * as React from 'react';
import kebabCase from 'es-toolkit/compat/kebabCase';
import type { TypesContentProps } from '@mui/internal-docs-infra/abstractCreateTypes';
import { useTypes } from '@mui/internal-docs-infra/useTypes';
import { PropsReferenceAccordion } from './PropsReferenceAccordion';
import { AttributesReferenceTable } from './AttributesReferenceTable';
import { CssVariablesReferenceTable } from './CssVariablesReferenceTable';

type ReferenceTableProps = TypesContentProps<{
  asParam?: string;
}>;

export function ReferenceTable(props: ReferenceTableProps) {
  const { types, multiple } = useTypes(props);

  const type = types && types[0];
  if (type?.type !== 'component') {
    return null;
  }

  const { asParam } = props;
  const data = type.data;
  const componentName = data.name;

  return (
    <React.Fragment>
      {/* Insert an <h3> with the part name for multi-part components.
          Single-part components headings and descriptions aren't displayed
          because they duplicate the page title and subtitle anyway. */}
      {multiple && (
        <React.Fragment>
          <h3 id={kebabCase(data.name)}>{data.name}</h3>
          {data.description && <p>{data.description}</p>}
        </React.Fragment>
      )}

      {Object.keys(data.props).length > 0 && (
        <PropsReferenceAccordion
          name={
            asParam && data.name.startsWith(componentName)
              ? `${asParam}${data.name.substring(componentName.length)}`
              : data.name
          }
          data={data.props}
          renameFrom={asParam ? componentName : undefined}
          renameTo={asParam}
        />
      )}

      {Object.keys(data.dataAttributes).length > 0 && (
        <AttributesReferenceTable data={data.dataAttributes} />
      )}

      {Object.keys(data.cssVariables).length > 0 && (
        <CssVariablesReferenceTable data={data.cssVariables} />
      )}
    </React.Fragment>
  );
}
