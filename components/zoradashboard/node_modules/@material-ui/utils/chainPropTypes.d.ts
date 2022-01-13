import PropTypes from 'prop-types';
export default function chainPropTypes<A, B>(propType1: PropTypes.Validator<A>, propType2: PropTypes.Validator<B>): PropTypes.Validator<A & B>;
